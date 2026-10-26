// Attribution for an image, taken from the artwork record it belongs to, so the homepage can credit whichever featured
// works it shows. An image with its own credit (a photograph) names its photographer or holder and licence; otherwise
// the record's single image source and its rights status are used.
/** @returns {{ by: string, licence: string, licenceUrl?: string, href: string }} */
export function imageCredit(img, art) {
  if (img.credit) return { by: img.credit.author, licence: img.credit.licence, licenceUrl: img.credit.licenceUrl, href: img.credit.sourceUrl };
  if (!art.imageSource) throw new Error(`No credit for image ${img.src}`);
  return { by: art.imageSource.label, licence: art.rights.status, href: art.imageSource.url };
}
