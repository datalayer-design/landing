/*
 * Copyright (c) 2022-2026 Datalayer, Inc.
 *
 * Datalayer License
 */

/** The avatars the Avatar page shows, in its order. */
export const DATALAYER_AVATAR_GALLERY = ['SvgAvatarOrb'] as const;

export type DatalayerAvatarGalleryName = (typeof DATALAYER_AVATAR_GALLERY)[number];
