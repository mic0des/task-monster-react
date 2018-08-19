pragma solidity ^0.4.23;

contract TaskMonster {
    address owner;

    struct Monster {
        string name;
        address owner;
        string gender;
    }
    
    mapping (uint256 => Monster) monsters;
    uint256[] public monsterIds;
    
    
    function getId(string _combined) public returns (uint256) {
        return uint256(keccak256(_combined));
    }
    
    function getMonster(uint256 _id) view public returns (string, string, address) {
        return (monsters[_id].name, monsters[_id].gender, monsters[_id].owner);
    }
    
    event monsterBorn(
        string name,
        string gender,
        address owner
    );
    
    function newMonster(string _gender, string _combined) public returns (string, string, address) {
        uint256 id;
        id = getId(_combined);
        if (id % 2 != 0) {
            monsters[id].name = "Schrodinger"; 
        } else {
            monsters[id].name = "Leaflet";
        }
        monsters[id].owner = msg.sender;
        monsters[id].gender = _gender;
        
        emit monsterBorn(monsters[id].name, _gender, msg.sender);
        
        monsterIds.push(id) - 1;
        
        return getMonster(id);
    }

}