import { flatten, isEmpty, orderBy } from 'lodash'
import moment from 'moment'

export const coachesListOrderBy = (coachesList) =>
  orderBy(
    coachesList.map((el) => ({
      ...el,
      coachData: {
        ...el.coachData,
        availabilities: el.coachData.availabilities.filter((s) =>
          moment().isSameOrBefore(s.startTime),
        ),
      },
    })),
    ['recommendAsCoach', (o) => o.coachData.availabilities.length],
    ['desc', 'desc'],
  )

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
    sessionDate,
  },
) => {
  let filteredCoaches = coaches
  if (sessionDate) {
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.coachData &&
        coach.coachData.availabilities.find((availability) => {
          return (
            moment(availability.startTime, 'YYYY-MM-DD HH:mm').format(
              'YYYYMMDDHH',
            ) === moment(sessionDate, 'YYYY-MM-DD HH:mm').format('YYYYMMDDHH')
          )
        }),
    )
  }
  if (name) {
    filteredCoaches = filteredCoaches.filter(
      (coach) =>
        coach.firstName.toLowerCase().includes(name) ||
        coach.lastName.toLowerCase().includes(name),
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
  return coachesListOrderBy(filteredCoaches)
}
export const getJobsList = (coaches, jobs) => {
  const list = []
  const jobsList = Array.from(
    new Set(
      coaches.map((coach) => {
        if (coach.coachData && coach.coachData.job) return coach.coachData.job
      }),
    ),
  )
  jobs.forEach((job) => {
    if (jobsList.includes(job._id)) {
      list.push(job)
    }
  })
  return list
}

export const getSpecialtiesList = (coaches, specialties) => {
  const list = []
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
  specialties.forEach((specialty) => {
    if (specialtiesList.includes(specialty._id)) {
      list.push(specialty)
    }
  })
  return list
}
export const getRegionsList = (coaches, regions) => {
  const list = []
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
  regions.forEach((region) => {
    if (regionsList.includes(region._id)) {
      list.push(region)
    }
  })
  return list
}
export default getFilteredCoaches
