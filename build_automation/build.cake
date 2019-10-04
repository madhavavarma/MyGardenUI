#addin "Cake.Npm"
#addin "Cake.Powershell"
#tool nuget:?package=OctopusTools&version=4.21.0

//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////
string pathSeperator = "/";

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

// Basic Arguments
var target = Argument("target", "DEFAULT");
var buildVersion = Argument("buildVersion", "1.0.2");
var package = Argument("package", "MyGardenUI");

// Scripts
var prodBuild = Argument("prodBuild", "prod_build");

// Folders
var rootFolder = Argument("rootFolder", "..");
var distFolder = Argument("distFolder", "dist");
var deployTemplatesFolder = Argument("deployTemplatesFolder", "deploy_templates");
var packageFolder = Argument("packageFolder", package);

// File Name 
var nuspecFile = Argument("nuspecFile", $"{package}.nuspec");

// Custom File Paths
var nuspecFilePath = Argument("nuspecFilePath", Path(rootFolder, deployTemplatesFolder, nuspecFile));
var nugetBasePath = Argument("nugetBasePath", Path(rootFolder, distFolder, packageFolder));
var nugetOutPutDir = Argument("nugetOutPutDir", Path(rootFolder, distFolder));

// Octopus variables
var octopusUrl = Argument("octopusUrl", "http://localhost:80");
var octopusApiKey = Argument("octopusApiKey", "API-VW3UM5ADQJPN22H57PITT9V8RUM");

//////////////////////////////////////////////////////////////////////
// PRELIMINARY TASK STEPS
//////////////////////////////////////////////////////////////////////
var npmSettings = new NpmInstallSettings();
npmSettings.FromPath(rootFolder);

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("NPM_INSTALL")
    .Does(() =>
{
    NpmInstall(npmSettings);
});

Task("BUILD")
    .Does(() =>
{
    NpmRunScript(prodBuild);
});

Task("NUGET_PACK")
	.Does(()=>
{
	NuGetPack(nuspecFilePath, new NuGetPackSettings{
		Id = package,
		Version = buildVersion,
		OutputDirectory = nugetOutPutDir,
		NoPackageAnalysis = true,
		BasePath = nugetBasePath
	});
});

Task("OCTO_PUSH").Does(()=>
{
	OctoPush( octopusUrl,
			  octopusApiKey,
			  GetFiles( $"{Path(rootFolder, distFolder)}/*.nupkg"),
			  new OctopusPushSettings {
					ReplaceExisting = true
			    });
});	

Task("OCTO_RELEASE").Does(()=>
{
	var createReleaseSettings = new CreateReleaseSettings
    {
		Server = octopusUrl,
		ApiKey = octopusApiKey,
		ReleaseNumber = $"{buildVersion}",
		DeploymentTimeout = TimeSpan.FromMinutes(25),					
		WaitForDeployment = true,
	    Packages = new Dictionary<string, string>()
		{
			{package, buildVersion}
		}
	};
	
    OctoCreateRelease(package, createReleaseSettings);
});	



//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("GEN_ARTIFACTS")
    .IsDependentOn("NPM_INSTALL")
    .IsDependentOn("BUILD")
    .IsDependentOn("NUGET_PACK");

Task("CREATE_OCTO_RELEASE")
    //.IsDependentOn("GEN_ARTIFACTS")
    .IsDependentOn("OCTO_PUSH")
    .IsDependentOn("OCTO_RELEASE");

Task("DEFAULT")
    .IsDependentOn("CREATE_OCTO_RELEASE");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);


//////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////
public string Path(params string[] folderNames) 
{
    return string.Join(pathSeperator, folderNames);
}