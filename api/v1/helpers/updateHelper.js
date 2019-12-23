const updatesHelper = async (id, res, updatedPharm, PharmService, util, message, error) => {
  try {
    const updates = await PharmService.updatePharm(id, updatedPharm);
    if (!updates) {
      util.setError(404, error);
    } else {
      util.setSuccess(200, message, updates);
    }
    return util.send(res);
  } catch (err) {
    util.setError(404, err);
    return util.send(res);
  }
};

export default updatesHelper;
