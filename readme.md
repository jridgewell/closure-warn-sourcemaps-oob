This is a test repo to demonstrate a Closure OOB read when using
sourcemaps with a transformed file with the same name as the original
source file.

## Instructions

1. `npm install`
2. `npm test`

## Notes

The bug is cased by the warning output for suspicious code. When
outputting the warning, it prints an excerpt of the code that caused the
warning.

Importantly, we map from the actual warning location (in the transformed
file) to the original source location (some real source file) at
[LightweightMessageFormatter.java#L110-L112][1]. We then fetch the
source code at [LightweightMessageFormatter.java#L153-L156][2]. This
eventually does a lookup using the transformed file's filename at
[Compiler.java#L2792-L2806][3].

In our case, both the transformed file and the real source file share
the same name! So, when we attempt to lookup by the filename, both
`inputsById` and `sourceMapOriginalSources` will contain the filename.
Because we `inputsById` contains it, we return that (the transformed
file's source code). So now we're accessing indexes in our transformed
file using source locations from our original file! Bug!


[1]: https://github.com/google/closure-compiler/blob/0a179a83d49e9303166fa4c8a82b5eef57730de5/src/com/google/javascript/jscomp/LightweightMessageFormatter.java#L110-L112
[2]: https://github.com/google/closure-compiler/blob/0a179a83d49e9303166fa4c8a82b5eef57730de5/src/com/google/javascript/jscomp/LightweightMessageFormatter.java#L153-L156
[3]: https://github.com/google/closure-compiler/blob/0a179a83d49e9303166fa4c8a82b5eef57730de5/src/com/google/javascript/jscomp/Compiler.java#L2792-L2806
