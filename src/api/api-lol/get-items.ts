import axios from 'axios'

export async function getItemsResponse({ queryKey }) {
  const [_, metadata] = queryKey

  const formattedPatchVersion =
    metadata?.metadata?.patchVersion.split(`.`).slice(0, 2).join(`.`) + `.1`

  const res = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${formattedPatchVersion}/data/en_US/item.json`,
  )

  return res.data.data
}
