#addin "Cake.Npm"
#addin "Cake.Powershell"
//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");

//////////////////////////////////////////////////////////////////////
// PREPARATION
//////////////////////////////////////////////////////////////////////
// const variables
var pathSeperator = "/";
var buildVersion = "1.0.0.0";
var package = "MyGardenUI";

// Define Files
var nuspecFile = $"{package}.nuspec";


// Define Folders.
var rootFolder = "..";
var distFolder = "dist";
var deployTemplatesFolder = "deploy_templates";
var packageFolder = $"{package}";


// Variables
var npmSettings = new NpmInstallSettings();

// Package json script key
var prodBuild = "prod_build";

// preliminary task steps
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
    var nuspecFilePath = Path(rootFolder, deployTemplatesFolder, nuspecFile);

	NuGetPack(nuspecFilePath, new NuGetPackSettings{
		Id = package,
		Version = buildVersion,
		OutputDirectory = Path(rootFolder, distFolder),
		NoPackageAnalysis = true,
		BasePath = Path(rootFolder, distFolder, packageFolder)
	});
});


//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("PERFORM_NUGET_PACK")
    .IsDependentOn("NPM_INSTALL")
    .IsDependentOn("BUILD")
    .IsDependentOn("NUGET_PACK");

Task("Default")
    .IsDependentOn("PERFORM_NUGET_PACK");

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