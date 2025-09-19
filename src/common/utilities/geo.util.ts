export function hasValidCoordinates(lat?: number, long?: number): boolean {
  return lat !== undefined && long !== undefined;
}
