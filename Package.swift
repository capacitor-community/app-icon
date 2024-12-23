// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorCommunityAppIcon",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "CapacitorCommunityAppIcon",
            targets: ["AppIconPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "6.0.0")
    ],
    targets: [
        .target(
            name: "AppIconPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/AppIconPlugin"),
        .testTarget(
            name: "AppIconPluginTests",
            dependencies: ["AppIconPlugin"],
            path: "ios/Tests/AppIconPluginTests")
    ]
)