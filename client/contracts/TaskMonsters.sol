pragma solidity ^0.4.23;

contract TaskMonsters {
    address owner;

    struct Monster {
        string name;
        address owner;
        string gender;
    }
    
    mapping (uint256 => Monster) monsters;
    uint256[] public monsterIds;
    
    //combine taskName and email address on the front-end 
    
    function getId(string _combined) public returns (uint256) {
        return uint256(keccak256(_combined));
    }
    
    function getMonster(uint256 _id) view public returns (string, string, address) {
        return (monsters[_id].name, monsters[_id].gender, monsters[_id].owner);
    }

    // use keccak256 to generate id based on msg.sender + taskName, this will
    // generate an id that, i guess based on that i'll determine the name of 
    // the monster based on a function determineType (change name into type)
    
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
        
        monsterIds.push(id) - 1;
        
        return getMonster(id);
    }

}