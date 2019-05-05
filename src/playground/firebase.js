  database.ref().set({
      name: 'Marco Pereira',
      age:26,
      stressLevel: 6,
      location: {
          city: 'San jose',
          country: 'Costa Rica'
      },
      job: {
        title: 'Software developer',
        company: 'Google'
      }
  }).then(() => {
        console.log('Data saved')
  }).catch( e => {
    console.log('It failed', e)
  })

  //database.ref().set('this is my data')
  ///updates only one prop in the database
  database.ref('age').set(35)
  ///updates only one child prop in the database
  database.ref('location/city').set('Coronado')

  //challenge
  database.ref('attributes').set({
      height: 6.5,
      weight: 90
  }).then(() => {
    console.log('Data saved')
  }).catch(e => {
    console.log('Error', e)
  })

  ///remove
  database.ref('isSingle').remove()
  .then(() => {
    console.log('Successfully removed');
  }).catch(e => {
    console.log(' Remove failed '+ e);
  })
 ///update
 database.ref()
 .update({
   stressLevel:9,
   'job/company': 'Amazon',
   'location/city': 'Seattle'
 })


 database.ref('expenses').on('value', (dataSnapshot) => {
  const expenses = [];

  dataSnapshot.forEach(childSnapshot => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    })
  })

  console.log(expenses)

})