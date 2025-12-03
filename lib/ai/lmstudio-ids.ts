export const LMSTUDIO_MODEL_ID_PREFIX = "lmstudio:";

export function createLmStudioModelId(identifier: string) {
  return `${LMSTUDIO_MODEL_ID_PREFIX}${identifier}`;
}

export function isLmStudioModelId(modelId: string) {
  return modelId.startsWith(LMSTUDIO_MODEL_ID_PREFIX);
}

export function extractLmStudioIdentifier(modelId: string) {
  return modelId.slice(LMSTUDIO_MODEL_ID_PREFIX.length);
}
