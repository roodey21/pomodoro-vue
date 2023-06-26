Array.prototype.latest = function () {
  if (this.length === 0) {
    return null
  }

  return this.reduce((prev, current) => {
    if (!prev || current.createdAt > prev.createdAt) {
      return current
    } else {
      return prev
    }
  })
}

Array.prototype.maxId = function () {
  if (this.length === 0) {
    return 0
  }
  return this.reduce((prev, current) => {
    if (!prev || current.id > prev.id) {
      return current
    } else {
      return prev
    }
  }).id
}
