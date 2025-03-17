{
  description = "A very basic flake";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let pkgs = nixpkgs.legacyPackages."x86_64-linux";
    in 
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = with pkgs; [ gcc python311 python311Packages.pip python311Packages.flask];
      };
    };
}