module.exports = (permission) => {
    return (req, res, next) => {
      const user = req.user;
  
      if (user.type === "super_admin") return next();
  
      const permissions = user.roles.flatMap(r => r.permissions);
  
      if (!permissions.includes(permission)) {
        return res.status(403).json({ message: "Access Denied" });
      }
  
      next();
    };
  };