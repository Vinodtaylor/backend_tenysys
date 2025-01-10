async function validateModel(model, callback) {
    error = model.validateSync();
    if (error != null) {
      for (var attributename in error.errors) {
        console.log(attributename + ": " + error.errors[attributename]);
      }
  
      return callback(error);
    }
  }
  
  function validateRoutes(routers) {
    var appStartUperror = [];
    var routesList = [];
    routers.stack.forEach((ele) => {
      if (ele.route.stack.length > 1) {
        appStartUperror.push(
          "The following path [" +
            ele.route.path +
            "] contains more than one route method"
        );
      }
      routesList.push(ele.route.path + ":" + ele.route.stack[0].method);
    });
    const set = new Set(routesList);
  
    const duplicates = routesList.filter((item) => {
      if (set.has(item)) {
        set.delete(item);
      } else {
        return item;
      }
    });
    duplicates.length != 0 &&
      appStartUperror.push("duplicate routers:", duplicates);
    return appStartUperror;
  }
  const emailReplacement = (html, changevalue, getvalue) => {
    // let chars = "0123456789",
    //   result = "";
    // for (let i = 4; i > 0; --i)
    //   result += chars[Math.round(Math.random() * (chars.length - 1))];
    // console.log("The OTP is: " + result);
    // return result;
    console.log(`From this value to ${changevalue} replace with ${getvalue}`);
    data = html.replace(changevalue, getvalue);
    // console.log(`Results: ${data}`);
    return data;
  };
  
  module.exports = {
    validateModel,
    validateRoutes,
    emailReplacement,
  };
  