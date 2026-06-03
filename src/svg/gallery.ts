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
  'SvgJoinHero',
  'SvgJoinConfirmHero',
  'SvgInvitesHero',
  'SvgDiscord',
  'SvgTutorialsHero',
  'SvgResearchHero',
  'SvgEventsHero',
  'SvgStarsHero',
  'SvgSpitfire',
  'SvgLinesLogo',
  'SvgOrganizationsAtScale',
  'SvgIndividualsAndTeams',
  'SvgAgentsHero',
  'SvgEarthHero',
  'SvgFastA2ADonation',
  'SvgDatasetHero',
  'SvgJupyterMcp',
  'SvgLines',
  'SvgPublicationsHero',
  'SvgNotFound',
  'SvgUnauthorized',
] as const;

export type DatalayerSvgGalleryName = (typeof DATALAYER_SVG_GALLERY)[number];
