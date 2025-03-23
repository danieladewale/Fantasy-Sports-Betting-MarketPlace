import React from 'react';
import * as NBALogos from 'react-nba-logos';
import * as NFLLogos from 'react-nfl-logos';

const TeamLogo = ({ teamName, league }) => {
  // Convert team name to the format expected by the logo packages
  const getLogoComponent = () => {
    const cleanName = teamName.toLowerCase()
      .replace(/\s+/g, '')  // Remove spaces
      .replace(/^the/i, ''); // Remove leading "the" if present

    // If it's the league logo, use a styled div for NBA and NFL logo from package
    if (teamName === 'NBA') {
      return (
        <div className="league-logo nba" style={{
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1d428a',
          borderRadius: '50%',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '28px',
          letterSpacing: '1px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          NBA
        </div>
      );
    }

    if (teamName === 'NFL') {
      return <NFLLogos.NFL size={100} />;
    }

    if (league.toUpperCase() === 'NBA') {
      // Map team names to NBA package component names
      const nbaTeamMap = {
        'bostonceltics': 'BOS',
        'brooklynnets': 'BKN',
        'newyorkknicks': 'NYK',
        'philadelphia76ers': 'PHI',
        'torontoraptors': 'TOR',
        'chicagobulls': 'CHI',
        'clevelandcavaliers': 'CLE',
        'detroitpistons': 'DET',
        'indianapacers': 'IND',
        'milwaukeebucks': 'MIL',
        'atlantahawks': 'ATL',
        'charlottehornets': 'CHA',
        'miamiheat': 'MIA',
        'orlandomagic': 'ORL',
        'washingtonwizards': 'WAS',
        'denvernuggets': 'DEN',
        'minnesotatimberwolves': 'MIN',
        'oklahomacitythunder': 'OKC',
        'portlandtrailblazers': 'POR',
        'utahjazz': 'UTA',
        'goldenstatewarriors': 'GSW',
        'laclippers': 'LAC',
        'losangeleslakers': 'LAL',
        'phoenixsuns': 'PHX',
        'sacramentokings': 'SAC',
        'dallasmavericks': 'DAL',
        'houstonrockets': 'HOU',
        'memphisgrizzlies': 'MEM',
        'neworleanspelicans': 'NOP',
        'sanantoniospurs': 'SAS'
      };

      const teamCode = nbaTeamMap[cleanName];
      if (teamCode) {
        const LogoComponent = NBALogos[teamCode];
        if (LogoComponent) {
          return <LogoComponent size={80} />;
        }
      }
    } else if (league.toUpperCase() === 'NFL') {
      // Map team names to NFL package component names
      const nflTeamMap = {
        'arizonacardinals': 'ARI',
        'atlantafalcons': 'ATL',
        'baltimoreravens': 'BAL',
        'buffalobills': 'BUF',
        'carolinapanthers': 'CAR',
        'chicagobears': 'CHI',
        'cincinnatibengals': 'CIN',
        'clevelandbrowns': 'CLE',
        'dallascowboys': 'DAL',
        'denverbroncos': 'DEN',
        'detroitlions': 'DET',
        'greenbaypackers': 'GB',
        'houstontexans': 'HOU',
        'indianapoliscolts': 'IND',
        'jacksonvillejaguars': 'JAX',
        'kansascitychiefs': 'KC',
        'lasvegasraiders': 'LV',
        'losangeleschargers': 'LAC',
        'losangelesrams': 'LAR',
        'miamidolphins': 'MIA',
        'minnesotavikings': 'MIN',
        'newenglandpatriots': 'NE',
        'neworleanssaints': 'NO',
        'newyorkgiants': 'NYG',
        'newyorkjets': 'NYJ',
        'philadelphiaeagles': 'PHI',
        'pittsburghsteelers': 'PIT',
        'sanfrancisco49ers': 'SF',
        'seattleseahawks': 'SEA',
        'tampabaybuccaneers': 'TB',
        'tennesseetitans': 'TEN',
        'washingtoncommanders': 'WAS'
      };

      const teamCode = nflTeamMap[cleanName];
      if (teamCode) {
        const LogoComponent = NFLLogos[teamCode];
        if (LogoComponent) {
          return <LogoComponent size={80} />;
        }
      }
    }

    // Fallback to league logo if team logo not found
    if (league.toUpperCase() === 'NFL') {
      return <NFLLogos.NFL size={80} />;
    }

    // Default fallback to NBA styled div
    return (
      <div className="league-logo nba" style={{
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1d428a',
        borderRadius: '50%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '24px',
        letterSpacing: '1px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        NBA
      </div>
    );
  };

  return (
    <div className="team-logo-container">
      {getLogoComponent()}
    </div>
  );
};

export default TeamLogo; 