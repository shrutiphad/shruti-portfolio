# Portrait background extraction

Built-in image_gen edit, transparent_background=true.
Input: reference/shruti-photo-original.png
Output: public/shruti-portrait-cutout.png
1131 × 1391 RGBA; corner alpha=0. Original input retained.

## Exact edit prompt
Use case: background-extraction. Edit target: the attached original photograph of Shruti Phad, a woman with black glasses, long dark hair, black blouse, necklace and yellow bracelet. Remove the ENTIRE background: car, foliage, buildings, ground, sky, absolutely everything except the woman. Output an actual transparent RGBA PNG cutout, with clean natural hair edges and no colored halo, backdrop or checkerboard baked in. Preserve the photographed person exactly: her facial identity, glasses, expression, natural skin texture, hair strands, proportions, hands, jewelry, blouse, pose, original lighting and natural colors. Do not beautify, redraw, change the face, recolor, add a digital/blue/dotted effect, or add/remove body parts. Frame from the top of her hair down to just below her folded hands and blouse hem (upper body/hips, no legs), with her complete head and both shoulders retained, tightly bounded horizontal framing and only a small transparent margin. This is a faithful photographic extraction for a portfolio hero, not a recreated portrait. Make the face as clear as the original photo, without artificial sharpening.

The homepage uses CSS upper-body framing and a short fade at the lower edge. The asset itself keeps its generated transparency and natural colors.
