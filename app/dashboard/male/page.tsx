import PlayerList, { ModelType } from 'app/ui/PlayerList'

export default async function Dashboard() {
  return (
    <div className="px-2 md:px-0 container mx-auto">
      {/* <h1 className="text-left uppercase">Bảng điểm nam</h1> */}
      <PlayerList MODEL={'players_male'} API="/api/players-male" />
    </div>
  )
}
