export const getIdFromGid = (gid: string) => gid.replace(/[^\d+]|\?.+/g, '');
