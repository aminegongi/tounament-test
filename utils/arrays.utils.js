export const getFilteredCoaches = (
  coaches,
  {
    name,
    job,
    specialty,
    experienceYears,
    reviewRate,
    coachingLevel,
    coachingAges,
    regions,
  },
) => {
  let filteredCoaches = coaches
  if (name) {
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.firstName.includes(name) || coach.lastName.includes(name),
    )
  }
  if (job) {
    filteredCoaches = filteredCoaches.filter(
      (coach) => coach.coachData && coach.coachData.job === job,
    )
  }
  if (specialty) {
    filteredCoaches = filteredCoaches.filter((coach) => {
      return coach.coachData && coach.coachData.specialty.includes(specialty)
    })
  }
  if (experienceYears) {
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.coachData &&
        coach.coachData.experiencesYearsNumber >= experienceYears,
    )
  }
  if (reviewRate !== '' && reviewRate !== undefined) {
    filteredCoaches = filteredCoaches.filter(
      (coach) => coach.averageRate >= reviewRate,
    )
  }
  if (coachingLevel) {
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.coachData &&
        coach.coachData.privateCourseData.level.includes(coachingLevel),
    )
  }

  if (coachingAges && coachingAges.length !== 0) {
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.coachData &&
        coach.coachData.privateCourseData.ages.find((age) =>
          coachingAges.includes(age),
        ),
    )
  }
  if (regions && regions.length !== 0) {
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.coachData &&
        coach.coachData.privateCourseData.regions.find((region) =>
          regions.includes(region),
        ),
    )
  }
  return filteredCoaches
}

export default getFilteredCoaches
