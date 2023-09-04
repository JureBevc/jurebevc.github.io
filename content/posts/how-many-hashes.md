---
title: "hashlookup - A reverse lookup table tool"
date: 2023-09-03T21:14:30+02:00
draft: false

tags:
  - "Go"
  - "Data"
  - "Databases"
  - "Cryptography"
---

## Introduction

Reverse hash lookup tables are data structures used to quicken the process of finding plaintext values corresponding to given hash values. Hash functions are designed to convert input data into fixed-length hash codes, making it challenging (impossible) to reverse-engineer the original input from the hash alone. 

Reverse hash lookup tables work by precomputing and storing pairs of plaintext and corresponding hash values. This allows for efficient and rapid identification of plaintext inputs when given a hash value, making them a valuable tool for attackers attempting to crack hashed passwords and a subject of interest for defenders seeking to enhance security measures by mitigating this type of vulnerability.

## The tool

The goal was to create a CLI tool for producing a reverse hash lookup table. It is intended to be simple and effective to use and allow anyone to generate a reverse lookup table of arbitrary size.

I've written this tool in Go, but requires the user to set up a local or remote PostgreSQL server themselves. The fastest way to do this is to run the [postgres docker image](https://hub.docker.com/_/postgres). All code is available on [GitHub](https://www.github.com/JureBevc/hashlookup).

The tool supports two ways to create and query your tables - simple or rainbow tables.

## Simple lookup tables

It is trivial to create the most basic version of a reverse lookup table, but that doesn't lessen their effectiveness. These tables simply store all provided passwords and their hashes. Running the following command will generate the table:

``` bash
hashlookup.exe create-lookup -alg [algorithm] -file [filepath]
```

To populate this table we loop through all passwords in the file, calculate the hash and add it to the database:

![Alt text](/hashlookup-code1.png)

After the table is generated you can query the data:
``` bash
hashlookup.exe check-lookup -alg [algorithm] -hash [hash]
```

## Rainbow tables

Generating rainbow tables is a more resource-intensive process. It involves hashing candidate passwords and then applying hash chain reduction functions to minimize storage requirements.

A single node in this chain can be represented by two functions called back to back. The input to the node is a potential password `x`, which gets passed to a hashing function and the output of the hashing `h` is then sent as a parameter to the reduction function, along with the index `i` of the node in the chain. The output of the reduction function is another potential password `y`, which can then serve as an input to the next node. Here's a visual example of a node:

![Alt text](/rainbow-table-node.png)

The main benefit of chaining these nodes is that we can store only the input to the first node and the result of the last node. To check if a hash exists in the rainbow table we construct a chain starting with the given hash and check if any of the node outputs match a record in our database. If so, we can reconstruct the chain from the chain inputs stored in our database and find which password in the chain belongs to the given hash. A single chain can therefore cover a larger amount of hashes, while only requiring us to store two values in the database.

The main issue in generating rainbow tables are collisions. Meaning that our reduction function can generate the same result for different hashes. This results in repeated nodes in the chain. Collisions tend to happen when a reduction function generates too few characters to properly spread out different hashes. Knowing this I decided to minimize these collisions by forcing the reduction functions to start the chain with longer strings and produce shorter strings towards the end. 

The length of the string was decided by the reduction function input parameter `i` and was clamped between common password length extremes. This resulted in fewer collisions, since they occured only towards the end of the chain. Here's a visual example of a collision using this approach:

![Alt text](/rainbow-collisions.png)

Here's a simple implementation of the reduction function that proved to be effective enough in producing fewer collisions:
![Alt text](/hashlookup-code2.png)

Creating a rainbow table with this tool is as straightforward as creating the simple lookup table:
```bash
hashlookup.exe create-rainbow -alg [algorithm] -file [filepath]
```

After the table is generated you can query the data:
``` bash
hashlookup.exe check-rainbow -alg [algorithm] -hash [hash]
```

## Performance

The tool was tested on a publicly available dataset of 10 million passwords and the SHA-256 algorithm. The simple lookup table required no additional parameters, while the rainbow table requires us to decide on the chain length, which was set to 1000 in this test.

Time: Generating the simple lookup table took around 25 minutes, while the rainbow table took a little under 8 hours.

Space: When compared in regards to disk space, the simple lookup table ended up with 817MB and the rainbow table with 578MB. Both tables were created using the same number of passwords, so this difference comes from the fact that all passwords mapped into smaller string in the rainbow table compared to the length of the entire SHA-256 hash that is stored for the simple table.

It goes without saying that querying the rainbow table also takes longer, but no intensive tests or comparisons were made so far.

## Conclusion
This was fun. Salt your passwords.

