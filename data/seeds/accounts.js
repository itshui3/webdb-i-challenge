
exports.seed = function(knex, Promise) {
  return knex('accounts').truncate()
    .then(function () {
      return knex('accounts').insert([
        { name: 'account-01', budget: 4000.00 },
        { name: 'account-02', budget: 206.75 },
        { name: 'account-03', budget: 6789.00 },
        { name: 'account-04', budget: 199.99 },
        { name: 'account-05', budget: 22.34 },
        { name: 'account-06', budget: 300.00 },
        { name: 'account-07', budget: 7000.00 },
        { name: 'account-08', budget: 78800.00 },
        { name: 'account-09', budget: 3030.30 },
        { name: 'account-10', budget: 19.56 },
        { name: 'account-11', budget: 19.91 },
        { name: 'account-12', budget: 7080.00 },
        { name: 'account-13', budget: 1234.00 },
        { name: 'account-14', budget: 4000.00 },
        { name: 'account-15', budget: 206.75 },
        { name: 'account-16', budget: 6789.00 },
        { name: 'account-17', budget: 199.99 },
        { name: 'account-18', budget: 22.34 },
        { name: 'account-19', budget: 300.00 },
        { name: 'account-20', budget: 7000.00 },
        { name: 'account-21', budget: 78800.00 },
        { name: 'account-22', budget: 3030.30 },
        { name: 'account-23', budget: 19.56 },
        { name: 'account-24', budget: 19.91 },
        { name: 'account-25', budget: 7080.00 },
        { name: 'account-26', budget: 1234.00 }
      ]);
    });
};
