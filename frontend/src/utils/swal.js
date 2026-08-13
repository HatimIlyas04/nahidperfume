// Lazy-loads sweetalert2 on first actual use instead of bundling it into
// whichever route's chunk happens to import it eagerly. Home.jsx and
// HomeOrderForm.jsx (both on the homepage's critical render path) only
// ever call this in response to a user action -- order submit, wishlist
// toggle, newsletter signup -- never during initial render, so there is
// no reason to make a first-time visitor download sweetalert2's ~21KB
// (gzipped) chunk before they've even seen a pack. Every call site here
// already treats Swal.fire() as fire-and-forget (none awaits or branches
// on the resolved result), so this is a drop-in replacement, not a
// behavior change.
let swalPromise;
function loadSwal() {
  if (!swalPromise) swalPromise = import("sweetalert2").then((m) => m.default);
  return swalPromise;
}

export async function fireAlert(options) {
  const Swal = await loadSwal();
  return Swal.fire(options);
}
