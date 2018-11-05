/*
Intersection is not the most effective but it keeps the order of elements in `A`
and `B`.
*/
function intersection(A, B) {
    var intersection = [];
    for (var elem_a of A) {
      for (var elem_b of B) {
          if (elem_a === elem_b) {
            intersection.push(elem_a);
          }
      }
    }
    return intersection;
}

function difference(A, B) {
  var diff = [];
  for (var elem_a of A) {
    if (B.indexOf(elem_a) === -1) {
      diff.push(elem_a);
    }
  }
  return diff;
}
