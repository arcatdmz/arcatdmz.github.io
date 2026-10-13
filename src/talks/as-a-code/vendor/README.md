# Lecture interpreter

These files are restored from the exact JS-Interpreter commit referenced by the original 2015 lecture:
https://github.com/arcatdmz/JS-Interpreter/tree/3bc01168d85bab8f2d67f5e1fb3492c7318489a7

- `interpreter.js`: JS-Interpreter, Apache-2.0; see `LICENSE` and its file header.
- `acorn.js`: Acorn, MIT; see `ACORN-LICENSE` and its file header.

Trailing whitespace was normalized; the original API and license headers are retained.

They run only inside the disposable lecture Worker. No browser DOM or network API is exposed to interpreted code. Keeping this pinned version preserves the original ES5 examples without depending on the retired RawGit CDN.
