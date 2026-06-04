/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

export const DATALAYER_SVG_GALLERY = [
  'SvgJupyterEmbed',
  'SvgAgentRuntimes',
  'SvgVSCodeExtension',
  'SvgBlogHero',
  'SvgPricingHero',
  'SvgContactHero',
  'SvgAgentsHomeHero',
  'SvgLoginHero',
  'SvgUsecasesHero',
  'SvgIntegrationsHero',
  'SvgChangelogHero',
  'SvgAboutHero',
  'SvgCareersHero',
  'SvgCommunityHero',
  'SvgJoin',
  'SvgJoinConfirm',
  'SvgInvites',
  'SvgDiscord',
  'SvgTutorialsHero',
  'SvgResearchHero',
  'SvgEventsHero',
  'SvgStarsHero',
  'SvgSpitfire',
  'SvgBlackSnake',
  'SvgLinesLogo',
  'SvgOrganizationsAtScale',
  'SvgIndividualsAndTeams',
  'SvgAgentsHero',
  'SvgEarthHero',
  'SvgFastA2ADonation',
  'SvgRadar',
  'SvgNotebookArtifact',
  'SvgDocumentArtifact',
  'SvgCellArtifact',
  'SvgDataset',
  'SvgJupyterMcp',
  'SvgLines',
  'SvgPublication',
  'SvgSquare1',
  'SvgSquare2',
  'SvgNotFound',
  'SvgUnauthorized',
] as const;

export type DatalayerSvgGalleryName = (typeof DATALAYER_SVG_GALLERY)[number];
