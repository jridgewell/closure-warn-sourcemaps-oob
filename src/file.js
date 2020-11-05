function test() {
  if (
    Math.random() && globalThis.foo
  ) {
    return true;
  }

  return false;
}
