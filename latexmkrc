$ENV{'TEXINPUTS'} = './src/styles//:' . ($ENV{'TEXINPUTS'} || '');

$latex = 'uplatex -kanji=utf8 -halt-on-error -interaction=nonstopmode %O %S';
$bibtex = 'upbibtex %O %B';
$dvipdf = 'dvipdfmx %O -o %D %S';
$pdf_mode = 3;

$out_dir = 'build';
$aux_dir = 'build';

$max_repeat = 5;
$clean_ext = 'aux bbl blg dvi fdb_latexmk fls log out synctex.gz toc run.xml';
