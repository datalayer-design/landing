<!--
  ~ Copyright (c) 2023-2026 Datalayer, Inc.
  ~
  ~ MIT License
-->

# Making a release

A tag releases `@datalayer/design` to npm, with no stored token: npm trusts
`.github/workflows/release.yaml` through OIDC (trusted publishing, GitHub
environment `npm`, with provenance). The tag names the version in
`package.json`.

## Steps

1. Bump `version` in `package.json`, on a branch, and open a pull request.
   CI (`build.yaml`) builds the package.
2. Merge, then tag the merge commit and push the tag:

   ```bash
   git checkout main && git pull
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

3. The `Release` workflow checks that the tag names the version, builds and
   packs the package, publishes it unless npm already has that version, and
   creates a GitHub release with generated notes.

## Trusted publishing

npm package `@datalayer/design`: GitHub Actions, organization
`datalayer-design`, repository `landing`, workflow filename `release.yaml`,
environment `npm`. npm provenance also checks `package.json`'s
`repository.url`, which names this repository.

The registry matches the repository, the workflow filename and the
environment exactly; renaming any of them means re-registering.
