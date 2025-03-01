import PlayerList from 'components/PlayerList'

export default async function Dashboard() {
  return (
    <div className="px-2 md:px-0 container mx-auto">
      {/* <h1 className="uppercase">Bảng điểm nữ</h1> */}
      <PlayerList MODEL={'players_female'} API="/api/players-female" />
    </div>
  )
}
