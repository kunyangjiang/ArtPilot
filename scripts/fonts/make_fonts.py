"""Build the site's self-hosted WOFF2 subsets (public/fonts/) from the official Google Fonts sources (SIL OFL 1.1).

Not part of the build. Run it again only when the text on / or /courses/ gains characters (see README.md).

    python make_fonts.py <sources dir> <site-chars.txt> <output dir>

Needs fontTools and brotli (pip install fonttools==4.55.3 brotli==1.1.0), ideally in a throwaway virtualenv.
"""
import io, sys, pathlib
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

src, chars_file, out = (pathlib.Path(a) for a in sys.argv[1:4])
out.mkdir(parents=True, exist_ok=True)
site = chars_file.read_text(encoding='utf-8')
ascii_ = ''.join(chr(c) for c in range(0x20, 0x7f))
latin_extra = ' ·–—‘’“”←→'   # nbsp · – — ‘ ’ “ ” ← →

jobs = [
    # (source file from google/fonts, output, axis limits, characters)
    # Static cut matched to the Bodoni MT the design was approved with: optical size 11 (the display sizes' hairlines
    # vanish inside image-filled numerals) and weight 500 (stem 0.146 of figure height; Bodoni MT 0.141, Moda 400 0.124).
    ('BodoniModa[opsz,wght].ttf', 'bodoni-moda-500.woff2', {'wght': 500, 'opsz': 11}, ascii_ + latin_extra),
    ('BodoniModa-Italic[opsz,wght].ttf', 'bodoni-moda-500-italic.woff2', {'wght': 500, 'opsz': 11}, ascii_ + latin_extra),
    ('NotoSerifSC[wght].ttf', 'noto-serif-sc-300-600.woff2', {'wght': (300, 600)}, ascii_ + site),
    ('NotoSansSC[wght].ttf', 'noto-sans-sc-300-500.woff2', {'wght': (300, 500)}, ascii_ + site),
]
for name, dest, limits, text in jobs:
    font = instancer.instantiateVariableFont(TTFont(src / name), limits)
    buf = io.BytesIO(); font.save(buf); buf.seek(0); font = TTFont(buf)   # reload: a fresh glyph table for the subsetter
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']          # keep kerning, ligatures and CJK punctuation forms
    opts.name_IDs = ['*']                 # keep every name record, including copyright, trademark and licence
    opts.name_languages = ['*']
    opts.notdef_outline = True
    opts.hinting = False
    sub = subset.Subsetter(opts)
    sub.populate(text=text)
    sub.subset(font)
    font.flavor = 'woff2'
    font.save(out / dest)
    print(f'{dest:34s} {(out / dest).stat().st_size / 1024:7.1f} KB  glyphs={len(font.getGlyphOrder())}')
