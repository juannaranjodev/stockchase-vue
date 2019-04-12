export function generateExpertLink (expert) {
  return `/expert/view/${expert.id}/${expert.name.replace(/\W+/g, ' ').replace(/\s+/g, '-')}`
}