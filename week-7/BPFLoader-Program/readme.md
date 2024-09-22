# BPF Loader Program

The [BPF Loader](https://github.com/solana-labs/solana/tree/27eff8408b7223bb3c4ab70523f8a8dca3ca6645/programs/bpf_loader/src) is the program designated as the "owner" of all other programs on the network, excluding Native Programs. It is responsible for deploying, upgrading, and executing custom programs.