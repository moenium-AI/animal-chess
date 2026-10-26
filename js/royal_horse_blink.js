// Rebuild horse blink from the undamaged open-eye art. Updates stay inside eyes.
const RoyalHorseBlink = (() => {
  'use strict';
  const W = 'KjT88uApNfzv2yo1/PHdKzX779osNfvx3C01/PHdLjX88N0vNfzz3yg2/fLcKTb88NoqNvvr1is2+/DcLDb98t0tNv3x3S42/fLeLzb27NkwNtvTwyc3/fLcKDf88t4pN/vv2yo3/fLdKzf88t4sN/3x3C03/PLdLjf78d0vN/nw3TA38enWMTfVy7wyN+jfzhc4/fbjGzj97dYoOPrv2Sk4++/aKjj88NsrOPzx3Cw4+/DbLTj98d4uOPju2y848+rXMDjr49ExOOHYxzI4raOWNDjq4dIWOf/s0Bc5++/YGDn57dcZOfns1xo5+erSJzn159MoOfjs1yk5++/aKjn88dwrOfzx3Cw5+/DcLTn77touOfXp1S857uLPMDnk2skxOdjOvjI5ycCxMznCt6oWOvz33hc68uLLGDrx4csZOvfn0Bo69OLLGzr04cocOvjo0h46//bjJzr369goOmY5LSk6+/DcKjr78NwrOvvw3Cw6+u3ZLTr46dUuOvbo1S868ePPMDrr380xOujezTI6ZjktMzrs49IUOygCARY7yLapFzvSv6sYO+bUvhk79OTNGjv35s4bO/no0Rw79ubQHTv57tonO/vw3ig7/vPgKTtmOS0qO2Y5LSs7/fPgLDv98d4tO/rq1i47+ODLLzv12sUwO2Y5LTE7ZjktMjv159UzO/HizhM8WiIdFDwtBQQVPGdGPBY8kHNmFzyzm4oYPM+6pxk87dzGGjz0480bPPrs1Rw8/O7ZHTz47dkfPPzv2yY8/fPiKTz98+EqPPzy4Cs8ZjktLDxmOS0tPGY5LS48ZjktLzxmOS0wPPbWwTE8+eDLMjz67do0PPzy3RQ9SxkVFT1bLykWPXZQRxc9lHNmGD20mIgZPd3Hsxo9797IGz367NccPfzv2x09+e3ZHj399OIoPf3y4Sk9/vLgKj399OErPf7y4Cw9/fLfLT387douPfjbxi899tC6MD3xyLIxPejHsjI9/erVFD5cIh4VPmY5LRY+aTkxFz6DWE4YPqqFdxk+0LOhGj7fyLUbPvfp1Rw+++7aHT5mOS0ePvzx4Cc+/fTiKj7/9eMrPvvw3yw+/fLgLT798d4uPvnfyi8+88iwMD7eqYwzPvzHqRQ/ayoiFT9tLyYWP2Y5LRc/fko/GD+fcGIZP9CunBo/4sazGz/04MwcP2Y5LR0/+/DdHj/27tspP/3z4So//PDdKz/+9eEsP/fr2i0/897ILj/y1L0vP+i6oDE//8KjFEB0LyQVQHAwJRZAcDQrF0BmOS0YQGY5LRlAZjktGkBmOS0bQGY5LRxA8d3IHUDx4c0eQO/k0ipA/fPhE0GJPSsVQWwsJBZBaTAoF0GSYFMYQbOCcRlB4rSfGkHoxLEbQe/QvBxB6s23HUHWs5seQezcyRVCZCchFkJSIxwXQrGHdxhCxpeEGULtuqIaQuzJtRtC58ezHELYqIseQv/86hVDXB4aGEPirJQZQ/a7oRpD9s64HUP/7tYbRPDGrw==';
  const B = 'KjKhZEsrMqBjSCwyoWJHLTKaXkQuMpFZQC8ya0MwMDIhFQ0oM6NnSikzo2VKKjOhZUkrM6FkSCwzn2NILTOgYkcuM5BZQC8zWDgoMDMqGxMzM1E1Jyk0oGNHKjSgZEgrNKFkSSw0nmJHLTSbYEUuNHRINC80TDAjMDQyIRgxNCkaEzI0NiMaKDWaX0QpNZ1hRio1oGRIKzWgZEksNZxhRy01k1xCLjVmQC8vNUcuIjA1NSMbMTUyIRkyNUUtIyc2nmRLKDaeZEopNqFnTS02mGRLLjZ3TjsvNlo7LTA2RC0iMTZHLiMyNk0yJjM2bUw7GTd+WkcaN0MtIxs3LiUhHDdBNC4fN6luUSc3qnNZKDc3JCUpN7J+Yyo3s39kKzewfGEsN6p2XC03o29VLjeZaFAvN4pcRzA3gVZDMTd+VEEyNzckJTM3iV9JFzhzOysYOCsWEBk4YUQ1GjhCKyEbOCsdFhw4NSMbHTgpGhMeOGxGMyc4uoluKDjEl3wpODckJSo4NyQlKzjHnIAsOMOUeC04rnheLji2el8vOLN1WzA4NyQlMTg3JCUyOKRyWzM4sIdwFzlyQC0YOVMtIBk5SCsfGjlGKyEbOTglHBw5SzMnHTlrSjkeOZdnTx85r3daKDnBkncpOdWvkyo51a6SKzk3JCUsOTckJS05NyQlLjk3JCUvOTckJTA5yoNmMTnKhWkyObaHbzQ5lFQ4FjoWCAoXOj4hGhg6QyQbGTpEJh0aOkgsIhs6TDUpHDprTj4dOpBrVh46vZV7HzrHoYcoOs+qjSk6zKOIKjrVrpMrOtStkCw6y56BLTq2fWAuOr17Xi86xHpdMDrKfl8xOsJ7XDI60pJ2FjspEhIXOzYbGBg7Ox8ZGTtCJB0aO0wvJRs7ak9BHDuNblsdO7eWfh4707OYHzvgxaogO/HgxCo7yZ2AKzvUr5EsO8eZey07rnRXLju0c1cvO750VzA7uG5RMzv9lG4WPDQXFxc8NyQlGDw5HRgZPEUmHxo8Y0U5GzyGaVkcPKWKdx082MCoHjzp1LofPDckJSA8+erQKTz66coqPMGRcys8yJ2ALDy4hGgtPKdsUC48qGpOLzywbFEWPTcaGBc9Ox4bGD03JCUZPUgpIRo9ZUI2Gz2Pb10cPbuhix094821Hj03JCUfPffo0DA9u25TFj4pExIXPjMaFhg+OyAaGT43JCUaPjckJRs+NyQlHD43JCUdPjckJR4+7trCHz715cwgPvzw2BU/QSAdFz9LKR4YP0UmHBk/akAvGj+DU0AbP6h+Zxw/yKqSHT/dxaweP+bPth8/9OTLID/88NchP/3w1hZADgYGF0BQLSAYQHpINRlAklhCGkCPWkQbQKR2XxxAyqyTHUDm0rceQMykixpBll9IG0GWYUscQcinjB9BwpyI';
  function apply(dst, open, team) {
    if (!['w', 'b'].includes(team) || dst.width !== 96 || dst.height !== 124 ||
        open.width !== 96 || open.height !== 124) throw new Error('Horse blink contract mismatch');
    const ctx = dst.getContext('2d', {willReadFrequently: true});
    if (!ctx) throw new Error('Horse blink context missing');
    ctx.clearRect(0, 0, 96, 124);
    ctx.drawImage(open, 0, 0);
    const pixels = ctx.getImageData(0, 0, 96, 124);
    const raw = atob(team === 'w' ? W : B);
    if (raw.length % 5) throw new Error('Invalid horse blink payload');
    for (let i = 0; i < raw.length; i += 5) {
      const x = raw.charCodeAt(i), y = raw.charCodeAt(i + 1);
      if (x < 18 || x > 54 || y < 45 || y > 71) throw new Error('Horse blink escaped eye region');
      const offset = 4 * (y * 96 + x);
      pixels.data[offset] = raw.charCodeAt(i + 2);
      pixels.data[offset + 1] = raw.charCodeAt(i + 3);
      pixels.data[offset + 2] = raw.charCodeAt(i + 4);
    }
    ctx.putImageData(pixels, 0, 0);
    return dst;
  }
  return {apply};
})();