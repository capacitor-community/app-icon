// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorCommunityAppIcon",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapacitorCommunityAppIcon",
            targets: ["AppIconPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0-alpha.3")
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
