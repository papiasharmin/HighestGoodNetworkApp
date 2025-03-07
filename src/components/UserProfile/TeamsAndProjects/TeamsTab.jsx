import React, { useState } from 'react';
import AddTeamPopup from './AddTeamPopup';
import UserTeamsTable from './UserTeamsTable';

const TeamsTab = props => {
  const { teamsData, userTeams, onDeleteteam, onAssignTeam, edit, role, onUserVisibilitySwitch, isVisible, canEditVisibility } = props;
  const [addTeamPopupOpen, setaddTeamPopupOpen] = useState(false);
  const [renderedOn, setRenderedOn] = useState(0);

  const onAddTeamPopupShow = () => {
    setaddTeamPopupOpen(true);
  };

  const onAddTeamPopupClose = () => {
    setaddTeamPopupOpen(false);
  };
  const onSelectDeleteTeam = teamId => {
    onDeleteteam(teamId);
  };

  const onSelectAssignTeam = team => {
    onAssignTeam(team);
    setRenderedOn(Date.now());
  };

  return (
    <React.Fragment>
      <AddTeamPopup
        open={addTeamPopupOpen}
        onClose={onAddTeamPopupClose}
        teamsData={teamsData}
        userTeamsById={userTeams}
        onSelectAssignTeam={onSelectAssignTeam}
      />
      <UserTeamsTable
        userTeamsById={userTeams}
        onButtonClick={onAddTeamPopupShow}
        onDeleteClick={onSelectDeleteTeam}
        onUserVisibilitySwitch={onUserVisibilitySwitch}
        canEditVisibility = {canEditVisibility}
        isVisible={isVisible}
        renderedOn={renderedOn}
        edit={edit}
        role={role}
      />
    </React.Fragment>
  );
};
export default TeamsTab;
