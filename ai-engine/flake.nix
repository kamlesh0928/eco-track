{
  description = "Eco Track Flask Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";  # Use the latest stable Nixpkgs
  };

  outputs = { self, nixpkgs }: let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in {
    devShells.${system}.default = pkgs.mkShell {
      packages = [
        pkgs.python311
        pkgs.python311Packages.pip
        pkgs.python311Packages.flask
        pkgs.python311Packages.aiohttp-cors
        pkgs.python311Packages.google-generativeai
        pkgs.python311Packages.flask-cors
        pkgs.python311Packages.python-dotenv
      ];
    };
  };
}
