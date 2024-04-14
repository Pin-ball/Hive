const infiniteScrollTrigger = (y, data, action) => {
  // TODO: Changer tableHeight pour une ref sur le tableau
  const tableHeight = 800;
  const contextHeight = data.length * 46;
  const top = Math.abs(y);

  if (contextHeight - top - tableHeight < 300) {
    action()
  }
};

const formatToForm = (data) => {
    for (const key in data) {
      if (key.includes('Date'))
        data[key] = new Date(data[key])
    }
    return data
}

export {
  infiniteScrollTrigger,
  formatToForm
}