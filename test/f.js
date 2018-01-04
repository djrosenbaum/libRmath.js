//https://stat.ethz.ch/R-manual/R-devel/library/stats/html/Fdist.html
//https://en.wikipedia.org/wiki/F-distribution
//

const libR = require('../dist/lib/libR.js');
const {
    FDist,
    Normal,
    rng: { MersenneTwister },
    rng: { normal: { Inversion } }
} = libR;

//some tools
const { arrayrify, seq: seqCreate, numberPrecision } = libR.R;
const log = arrayrify(Math.log);

// just like in R
const seq = seqCreate()();

//show number up to 6 significant digits
const precision = numberPrecision(9);

//1. initialize default
const fDefault = FDist();

//1 initialize explicit
const mt = new MersenneTwister(1234);
const fDist1 = FDist(Normal(new Inversion(mt)));

const { df, pf, qf, rf } = fDist1;

/*R
df(seq(0,4,0.5), df1=5,df2=10, ncp=8)
[1] 0.0000000 0.0972907 0.2195236 0.2702561
[5] 0.2629984 0.2290042 0.1884130 0.1505385
[9] 0.1185561
*/

//1.
precision(df(seq(0, 4, 0.5), 5, 10, 8));
/*[ 
  0,
  0.0972906993,
  0.219523567,
  0.270256085,
  0.262998414,
  0.229004229,
  0.188412981,
  0.150538493,
  0.118556123 ]
*/

//2.
precision(df(seq(0, 4, 0.5), 50, 10, undefined, true));
/*[ -Infinity,
  -0.688217839,
  -0.222580527,
  -0.940618761,
  -1.7711223,
  -2.55950945,
  -3.28076319,
  -3.93660717,
  -4.53440492 ]*/

//R
/*2:
  > df(seq(0,4,0.5), df1=50,df2=10, log = TRUE)
[1]       -Inf -0.6882178 -0.2225805 -0.9406188
[5] -1.7711223 -2.5595094 -3.2807632 -3.9366072
[9] -4.5344049
*/

//R
/*3:
> df(seq(0, 4, 0.5), 6, 25)
[1] 0.000000000 0.729921524 0.602808536
[4] 0.323999956 0.155316972 0.072482940
[7] 0.034022568 0.016280785 0.007986682
*/

//3
precision(df(seq(0, 4, 0.5), 6, 25));
/*[ 0,
  0.729921524,
  0.602808536,
  0.323999956,
  0.155316972,
  0.0724829398,
  0.0340225684,
  0.0162807852,
  0.00798668195 ]*/

precision(df(seq(0, 4), 6, 25, 8, true));
//[ -Infinity, -1.38207439, -1.09408866, -1.54026185, -2.22490033 ]

/*R
> df(seq(0, 4), 6, 25, 8,log=TRUE)
[1]      -Inf -1.382074 -1.094089 -1.540262 -2.22490
*/

//1.
precision(pf(seq(0, 4, 0.5), 5, 10, 8));
/*[ 0,
  0.0189961379,
  0.100468407,
  0.225990517,
  0.361015189,
  0.484609879,
  0.588981209,
  0.673508458,
  0.740516322 ]
*/

//1.R
/*
> pf(seq(0, 4, 0.5), 5, 10, 8)
[1] 0.00000000 0.01899614 0.10046841 0.22599052 0.36101519 0.48460988 0.58898121
[8] 0.67350846 0.74051632
*/

//2.
precision(pf(seq(0, 4, 0.5), 50, 10, undefined, false));
/*[ 1,
  0.946812312,
  0.543643095,
  0.25065625,
  0.118135409,
  0.0595867293,
  0.0321901407,
  0.0184730352,
  0.0111614023 ]
*/

//2
//R
/*> pf(seq(0, 4, 0.5), 50, 10, lower.tail=FALSE)
[1] 1.00000000 0.94681231 0.54364309 0.25065625 0.11813541 0.05958673 0.03219014
[8] 0.01847304 0.01116140
*/

//3.
precision(pf(seq(0, 4, 0.5), 50, 10, undefined, false, true));
/*[ 
  0,
  -0.0546543979,
  -0.609462324,
  -1.3836728,
  -2.13592378,
  -2.82032239,
  -3.43609506,
  -3.99144317,
  -4.49529367 
]
*/

//3. R
/*
> pf(seq(0, 4, 0.5), 50, 10, lower.tail=FALSE, log.p=TRUE)
[1]  0.0000000 -0.0546544 -0.6094623 -1.3836728 -2.1359238 -2.8203224 -3.4360951
[8] -3.9914432 -4.4952937
*/

//4.
precision(pf(seq(0, 4, 0.5), 6, 25, 8, true, true));
/*[ -Infinity,
  -4.20235111,
  -2.29618223,
  -1.376145,
  -0.85773694,
  -0.546177623,
  -0.35253857,
  -0.229797274,
  -0.15099957 ]
*/

//
/*4 R
pf(seq(0, 4, 0.5), 6, 25, 8, TRUE, TRUE);
[1] -Inf -4.2023511 -2.2961822 -1.3761450 -0.8577369 -0.5461776 -0.3525386
[8] -0.2297973 -0.1509996
*/

//1
let q1 = qf(
    [
        0,
        0.0189961379,
        0.100468407,
        0.225990517,
        0.361015189,
        0.484609879,
        0.588981209,
        0.673508458,
        0.740516322,
        1
    ],
    5,
    10,
    8
);
precision(q1);
//[ 0, 0.5, 0.999999998, 1.5, 2, 2.5, 3, 3.5, 4, Infinity ]

//2
let q2 = qf(
    [
        1,
        0.946812312,
        0.543643095,
        0.25065625,
        0.118135409,
        0.0595867293,
        0.0321901407,
        0.0184730352,
        0.0111614023
    ],
    50,
    10,
    undefined,
    false
);
precision(q2);
//[ 0, 0.5, 0.999999998, 1.5, 2, 2.5, 3, 3.5, 4, Infinity ]

//3.
let q3 = qf(
    [
        0, -0.0546543979, -0.609462324, -1.3836728, -2.13592378, -2.82032239, -3.43609506, -3.99144317, -4.49529367
    ],
    50,
    10,
    undefined,
    false,
    true
);
precision(q3);
//[ 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4 ]

//4
let q4 = qf(
    [-Infinity, -4.20235111, -2.29618223, -1.376145, -0.85773694, -0.546177623, -0.35253857, -0.229797274, -0.15099957],
    6,
    25,
    8,
    true,
    true
);
precision(q4);
//[ 0, 0.500000001, 1, 1.5, 2, 2.5, 3, 3.5, 4 ]

//1.
mt.init(1234);
precision(rf(5, 8, 6));
//[0.3986174, 2.13290818, 2.02114876, 2.5957924, 4.01140249]

//2.
precision(rf(5, Infinity, Infinity));
//[ 1, 1, 1, 1, 1 ]

//3. produces NaNs because df1 or/and df2 is Infinity and ncp !== undefined (yes, ncp=0 produces NaNs!)
precision(rf(5, 40, Infinity, 0));
//[ NaN, NaN, NaN, NaN, NaN ]

//4. 
precision(rf(5, 400, Infinity));
//[ 0.952329364, 1.00699208, 0.963147631, 0.997853633, 0.994844237 ]

//R  rf
/*
RNGkind("Mersenne-Twister", normal.kind="Inversion");
set.seed(1234);

#1.
> rf(5,8,6)
[1] 0.3986174 2.1329082 2.0211488 2.5957924 4.0114025

#2.
> rf(5, Inf, Inf)
[1] 1 1 1 1 1

#3.
> rf(5, 40, Inf, 0)
[1] NaN NaN NaN NaN NaN

#4.
> rf(5, 400, Inf)
[1] 0.9523294 1.0069921 0.9631476 0.9978536 0.9948442
*/