'use strict';

module.exports = async (ctx, next) => {

  let spacePath = '';

  const auth = {
    role: "admin",
    id: 1,
  }

  if (auth.role) {
    spacePath = `${auth.role}`;
  }

  if (auth.id) {
    spacePath = `${spacePath}/${auth.id}`;
  }

  const { query } = ctx;

  if (query.category) {
    spacePath = `${spacePath}/${query.category}`;
  }

  ctx.spacePath = spacePath;

  await next();

}
