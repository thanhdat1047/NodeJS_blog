const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (col, sort) => {
        const icons = {
            default: "fa-solid fa-sort",
            asc: "fa-solid fa-arrow-up-short-wide",
            desc: "fa-solid fa-arrow-down-wide-short",
        };
        const types = {
            default: "desc",
            asc: "desc",
            desc: "asc",
        };
        const sortType = col === sort.column ? sort.type : "default";
        const icon = icons[sortType];
        const type = types[sort.type];

        const href = Handlebars.escapeExpression(`?_sort&column=${col}&type=${type}`);

        const output =  ` <a href="${href}">
                      <i class="${icon}"></i>
                      </a>`;
        return new Handlebars.SafeString(output);
    },
};
