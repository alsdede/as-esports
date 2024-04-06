import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getItemsResponse({ queryKey }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, metadata] = queryKey

  const formattedPatchVersion =
    metadata?.metadata?.patchVersion.split(`.`).slice(0, 2).join(`.`) + `.1`

  const res = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${formattedPatchVersion}/data/en_US/item.json`,
  )

  return res.data.data
}
