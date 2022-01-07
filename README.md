# SPK Auth

PNPM Monorepo for spk auth packages

# Developing

## Install PNPM

This project uses the PNPM package manager.  For installation instructions, see https://pnpm.io/installation.

## Install project dependencies

```sh
# In the project root
pnpm install
pnpm build
```

## PNPM workspaces

This project is a monorepo using two tools:

1. [PNPM Workspaces](https://pnpm.io/workspaces)
2. [Changesets](https://pnpm.io/using-changesets)

## Publishing


```sh
pnpm changeset # select changes and major, minor, or patch version increments
pnpm changeset version
pnpm install
pnpm publish -r    
```