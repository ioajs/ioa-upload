'use strict';

module.exports = async (ctx, next) => {

  let spacePath = 'user';

  const { query } = ctx;

  if (query.category) {
    spacePath = `${spacePath}/${query.category}`;
  }

  ctx.spacePath = spacePath;

  await next();

}
