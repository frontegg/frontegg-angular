import angularCoreVersion from '@angular/core/package.json';

const major = Number(angularCoreVersion?.version?.split('.')?.[0] ?? 0);
export const isAngular16 = major >= 16;
