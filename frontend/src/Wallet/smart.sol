// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        string id;
        string brand;
        string mem;
        string store;
        string processor;
        string graphics;
        string battery;
    }

    mapping(string => Certificate) certificates;
    string[] certificateHashes;

    function addCertificate(
        string memory id,
        string memory brand,
        string memory mem,
        string memory store,
        string memory processor,
        string memory graphics,
        string memory battery
    ) public {
        Certificate memory certificate = Certificate({
            id: id,
            brand: brand,
            mem: mem,
            store: store,
            processor: processor,
            graphics: graphics,
            battery: battery
        });
        certificates[id] = certificate;
        certificateHashes.push(id);
    }

    function getAllCertificates() public view returns (string[] memory, string[] memory, string[] memory) {
        uint256 length = certificateHashes.length;
        string[] memory ids = new string[](length);
        string[] memory brands = new string[](length);
        string[] memory processors = new string[](length);

        for (uint256 i = 0; i < length; i++) {
            Certificate storage certificate = certificates[certificateHashes[i]];
            ids[i] = certificate.id;
            brands[i] = certificate.brand;
            processors[i] = certificate.processor;
        }

        return (ids, brands, processors);
    }

    function getOneCertificate(string memory id) public view returns (string memory, string memory, string memory, string memory, string memory, string memory,string memory) {
        Certificate storage certificate = certificates[id];
        if (bytes(certificate.id).length == 0) {
            return ("Product not present", "", "", "", "", "","");
        } else {
            return (certificate.id, certificate.brand, certificate.mem, certificate.store, certificate.processor, certificate.graphics,certificate.battery);
        }
    }
}