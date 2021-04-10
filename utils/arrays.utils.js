import { flatten, isEmpty } from 'lodash'
import moment from 'moment'

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
    sessionDate
  },
) => {
  let filteredCoaches = coaches
  console.log('coaches: ', coaches[0].coachData);
  console.log('sessionDate: ', sessionDate);
  if(sessionDate){
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.coachData &&
        coach.coachData.availabilities.find(
          (availability) =>{
            console.log(coach.lastName)
            console.log(
              moment(availability.startTime, 'YYYY-MM-DD HH:mm').format(
                'YYYYMMDDHH',
              ),
            )
            console.log(
              moment(sessionDate, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHH'),
            )
            console.log("------")
            return (
              moment(availability.startTime, 'YYYY-MM-DD HH:mm').format(
                'YYYYMMDDHH',
              ) === moment(sessionDate, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHH')
            )
          }
        ),
    )
  }
  if (name) {
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.firstName.toLowerCase().includes(name) || coach.lastName.toLowerCase().includes(name),
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
export const getJobsList = (coaches, jobs) => {
  let list = []
  const jobsList = Array.from(
    new Set(
      coaches.map((coach) => {
        if (coach.coachData.job === 'pilatesCoach'){
          console.log('coach: ', coach);

        }
          if (coach.coachData && coach.coachData.job) return coach.coachData.job
      }),
    ),
  )
  console.log('jobsList: ', jobsList)
  jobs.forEach((job) => {
    if (jobsList.includes(job._id)) {
      list.push(job)
    }
  })
  return list
}

export const getSpecialtiesList = (coaches, specialties) => {
  let list = []
  const specialtiesList = Array.from(
    new Set(
      flatten(
        coaches.map((coach) => {
          if (coach.coachData && !isEmpty(coach.coachData.specialty))
            return coach.coachData.specialty
        }),
      ),
    ),
  )
  console.log('specialtiesList: ', specialtiesList)
  specialties.forEach((specialty) => {
    if (specialtiesList.includes(specialty._id)) {
      list.push(specialty)
    }
  })
  return list
}
export const getRegionsList = (coaches, regions) => {
  let list = []
  const regionsList = Array.from(
    new Set(
      flatten(
        coaches.map((coach) => {
          const regions = []
          if (
            coach.coachData &&
            !isEmpty(coach.coachData.privateCourseData) &&
            !isEmpty(coach.coachData.privateCourseData.regions)
          ) {
            regions.push(...coach.coachData.privateCourseData.regions)
          }
          if (
            coach.coachData &&
            !isEmpty(coach.coachData.privateCourseData) &&
            !isEmpty(coach.coachData.privateCourseData.otherRegions)
          ) {
            regions.push(
              ...coach.coachData.privateCourseData.otherRegions.map(
                (region) => region.name,
              ),
            )
          }
          return regions
        }),
      ),
    ),
  )
  console.log('regionsList: ', regionsList)
  regions.forEach((region) => {
    if (regionsList.includes(region._id)) {
      list.push(region)
    }
  })
  return list
}
export default getFilteredCoaches
