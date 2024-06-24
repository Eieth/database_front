<template>
    <el-button type="primary" style="margin-left: 5vw;" @click="updateDialog">更新</el-button>
    <el-button type="warning" style="margin-left: 5vw;" @click="insertDialog">插入</el-button>
    <el-dialog v-model="updateDialogVisible" title="更新" width="30%" v-if="route.query.tables === 'StationOverview'"
        :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="StationOverviewForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="StationOverviewForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="测站名称" prop="stationName">
                <el-input v-model="StationOverviewForm.stationName" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%" v-if="route.query.tables === 'StationOverview'"
        :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="StationOverviewForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="StationOverviewForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="测站名称" prop="stationName">
                <el-input v-model="StationOverviewForm.stationName" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="更新" width="30%" v-if="route.query.tables === 'ElevationInfo'"
        :before-close="leave">
        <el-form>
            <el-form-item label="高程信息编码" prop="elevationCode">
                <el-input v-model="ElevationInfoForm.elevationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="ElevationInfoForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="测站高程" prop="stationElevation">
                <el-input v-model="ElevationInfoForm.stationElevation" />
            </el-form-item>
            <el-form-item label="基面名称" prop="referenceFrameName">
                <el-input v-model="ElevationInfoForm.referenceFrameName" />
            </el-form-item>
            <el-form-item label="基面修正值" prop="referenceFrameCorrection">
                <el-input v-model="ElevationInfoForm.referenceFrameCorrection" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%" v-if="route.query.tables === 'ElevationInfo'"
        :before-close="leave">
        <el-form>
            <el-form-item label="高程信息编码" prop="elevationCode">
                <el-input v-model="ElevationInfoForm.elevationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="ElevationInfoForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="测站高程" prop="stationElevation">
                <el-input v-model="ElevationInfoForm.stationElevation" />
            </el-form-item>
            <el-form-item label="基面名称" prop="referenceFrameName">
                <el-input v-model="ElevationInfoForm.referenceFrameName" />
            </el-form-item>
            <el-form-item label="基面修正值" prop="referenceFrameCorrection">
                <el-input v-model="ElevationInfoForm.referenceFrameCorrection" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="更新" width="30%"
        v-if="route.query.tables === 'StationGeographicalLocation'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="StationGeographicalLocationForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="StationGeographicalLocationForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
                <el-input v-model="StationGeographicalLocationForm.longitude" />
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
                <el-input v-model="StationGeographicalLocationForm.latitude" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%"
        v-if="route.query.tables === 'StationGeographicalLocation'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="StationGeographicalLocationForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="StationGeographicalLocationForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="经度" prop="longitude">
                <el-input v-model="StationGeographicalLocationForm.longitude" />
            </el-form-item>
            <el-form-item label="纬度" prop="latitude">
                <el-input v-model="StationGeographicalLocationForm.latitude" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="更新" width="30%" v-if="route.query.tables === 'StationAddress'"
        :before-close="leave">
        <el-form>
            <el-form-item label="测站地址编码" prop="stationAddressCode">
                <el-input v-model="StationAddressForm.stationAddressCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="StationAddressForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="所在省/自治区/直辖市" prop="provinceAutonomousRegionMunicipality">
                <el-input v-model="StationAddressForm.provinceAutonomousRegionMunicipality" />
            </el-form-item>
            <el-form-item label="所在市/区" prop="cityDistrict">
                <el-input v-model="StationAddressForm.cityDistrict" />
            </el-form-item>
            <el-form-item label="所在县/市" prop="countyCity">
                <el-input v-model="StationAddressForm.countyCity" />
            </el-form-item>
            <el-form-item label="所在乡/镇" prop="townVillage">
                <el-input v-model="StationAddressForm.townVillage" />
            </el-form-item>
            <el-form-item label="所在村/街道" prop="villageStreet">
                <el-input v-model="StationAddressForm.villageStreet" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%" v-if="route.query.tables === 'StationAddress'"
        :before-close="leave">
        <el-form>
            <el-form-item label="测站地址编码" prop="stationAddressCode">
                <el-input v-model="StationAddressForm.stationAddressCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="StationAddressForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="所在省/自治区/直辖市" prop="provinceAutonomousRegionMunicipality">
                <el-input v-model="StationAddressForm.provinceAutonomousRegionMunicipality" />
            </el-form-item>
            <el-form-item label="所在市/区" prop="cityDistrict">
                <el-input v-model="StationAddressForm.cityDistrict" />
            </el-form-item>
            <el-form-item label="所在县/市" prop="countyCity">
                <el-input v-model="StationAddressForm.countyCity" />
            </el-form-item>
            <el-form-item label="所在乡/镇" prop="townVillage">
                <el-input v-model="StationAddressForm.townVillage" />
            </el-form-item>
            <el-form-item label="所在村/街道" prop="villageStreet">
                <el-input v-model="StationAddressForm.villageStreet" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="更新" width="30%" v-if="route.query.tables === 'StationBasicInfo'"
        :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="StationBasicInfoForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="StationBasicInfoForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="流域水系" prop="basinWaterSystem">
                <el-input v-model="StationBasicInfoForm.basinWaterSystem" />
            </el-form-item>
            <el-form-item label="河流名称" prop="riverName">
                <el-input v-model="StationBasicInfoForm.riverName" />
            </el-form-item>
            <el-form-item label="设站日期" prop="installationDate">
                <el-input v-model="StationBasicInfoForm.installationDate" />
            </el-form-item>
            <el-form-item label="集水面积" prop="drainageArea">
                <el-input v-model="StationBasicInfoForm.drainageArea" />
            </el-form-item>
            <el-form-item label="站类管理" prop="stationClassManagement">
                <el-input v-model="StationBasicInfoForm.stationClassManagement" />
            </el-form-item>
            <el-form-item label="测站属性" prop="stationAttribute">
                <el-input v-model="StationBasicInfoForm.stationAttribute" />
            </el-form-item>
            <el-form-item label="测站分类" prop="stationClassification">
                <el-input v-model="StationBasicInfoForm.stationClassification" />
            </el-form-item>
            <el-form-item label="测站地址编码" prop="stationAddressCode">
                <el-input v-model="StationBasicInfoForm.stationAddressCode" />
            </el-form-item>
            <el-form-item label="建设管理单位" prop="constructionManagementUnit">
                <el-input v-model="StationBasicInfoForm.constructionManagementUnit" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%" v-if="route.query.tables === 'StationBasicInfo'"
        :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="StationBasicInfoForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="StationBasicInfoForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="流域水系" prop="basinWaterSystem">
                <el-input v-model="StationBasicInfoForm.basinWaterSystem" />
            </el-form-item>
            <el-form-item label="河流名称" prop="riverName">
                <el-input v-model="StationBasicInfoForm.riverName" />
            </el-form-item>
            <el-form-item label="设站日期" prop="installationDate">
                <el-input v-model="StationBasicInfoForm.installationDate" />
            </el-form-item>
            <el-form-item label="集水面积" prop="drainageArea">
                <el-input v-model="StationBasicInfoForm.drainageArea" />
            </el-form-item>
            <el-form-item label="站类管理" prop="stationClassManagement">
                <el-input v-model="StationBasicInfoForm.stationClassManagement" />
            </el-form-item>
            <el-form-item label="测站属性" prop="stationAttribute">
                <el-input v-model="StationBasicInfoForm.stationAttribute" />
            </el-form-item>
            <el-form-item label="测站分类" prop="stationClassification">
                <el-input v-model="StationBasicInfoForm.stationClassification" />
            </el-form-item>
            <el-form-item label="测站地址编码" prop="stationAddressCode">
                <el-input v-model="StationBasicInfoForm.stationAddressCode" />
            </el-form-item>
            <el-form-item label="建设管理单位" prop="constructionManagementUnit">
                <el-input v-model="StationBasicInfoForm.constructionManagementUnit" />
            </el-form-item>
        </el-form>


        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="更新" width="30%"
        v-if="route.query.tables === 'HydrologicalStationCharacteristicValues'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="HydrologicalStationCharacteristicValuesForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="多年平均径流量" prop="averageRunoff">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.averageRunoff" />
            </el-form-item>
            <el-form-item label="实测最大流量" prop="measuredMaxFlow">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.measuredMaxFlow" />
            </el-form-item>
            <el-form-item label="实测最大流量时间" prop="measuredMaxFlowTime">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.measuredMaxFlowTime" />
            </el-form-item>
            <el-form-item label="实测最小流量" prop="measuredMinFlow">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.measuredMinFlow" />
            </el-form-item>
            <el-form-item label="实测最小流量时间" prop="measuredMinFlowTime">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.measuredMinFlowTime" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%"
        v-if="route.query.tables === 'HydrologicalStationCharacteristicValues'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="HydrologicalStationCharacteristicValuesForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="多年平均径流量" prop="averageRunoff">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.averageRunoff" />
            </el-form-item>
            <el-form-item label="实测最大流量" prop="measuredMaxFlow">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.measuredMaxFlow" />
            </el-form-item>
            <el-form-item label="实测最大流量时间" prop="measuredMaxFlowTime">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.measuredMaxFlowTime" />
            </el-form-item>
            <el-form-item label="实测最小流量" prop="measuredMinFlow">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.measuredMinFlow" />
            </el-form-item>
            <el-form-item label="实测最小流量时间" prop="measuredMinFlowTime">
                <el-input v-model="HydrologicalStationCharacteristicValuesForm.measuredMinFlowTime" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="更新" width="30%"
        v-if="route.query.tables === 'WaterLevelStationCharacteristicValues'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="WaterLevelStationCharacteristicValuesForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="实测最高水位" prop="measuredMaxWaterLevel">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.measuredMaxWaterLevel" />
            </el-form-item>
            <el-form-item label="实测最高水位时间" prop="measuredMaxWaterLevelTime">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.measuredMaxWaterLevelTime" />
            </el-form-item>
            <el-form-item label="实测最低水位" prop="measuredMinWaterLevel">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.measuredMinWaterLevel" />
            </el-form-item>
            <el-form-item label="实测最低水位时间" prop="measuredMinWaterLevelTime">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.measuredMinWaterLevelTime" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%"
        v-if="route.query.tables === 'WaterLevelStationCharacteristicValues'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="WaterLevelStationCharacteristicValuesForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="实测最高水位" prop="measuredMaxWaterLevel">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.measuredMaxWaterLevel" />
            </el-form-item>
            <el-form-item label="实测最高水位时间" prop="measuredMaxWaterLevelTime">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.measuredMaxWaterLevelTime" />
            </el-form-item>
            <el-form-item label="实测最低水位" prop="measuredMinWaterLevel">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.measuredMinWaterLevel" />
            </el-form-item>
            <el-form-item label="实测最低水位时间" prop="measuredMinWaterLevelTime">
                <el-input v-model="WaterLevelStationCharacteristicValuesForm.measuredMinWaterLevelTime" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="更新" width="30%"
        v-if="route.query.tables === 'RainfallStationCharacteristicValues'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="RainfallStationCharacteristicValuesForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="RainfallStationCharacteristicValuesForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="器口高度" prop="instrumentHeight">
                <el-input v-model="RainfallStationCharacteristicValuesForm.instrumentHeight" />
            </el-form-item>
            <el-form-item label="多年平均降雨量" prop="averageRainfall">
                <el-input v-model="RainfallStationCharacteristicValuesForm.averageRainfall" />
            </el-form-item>
            <el-form-item label="实测年最大降雨量" prop="measuredMaxRainfall">
                <el-input v-model="RainfallStationCharacteristicValuesForm.measuredMaxRainfall" />
            </el-form-item>
            <el-form-item label="出现年份" prop="occurrenceYear">
                <el-input v-model="RainfallStationCharacteristicValuesForm.occurrenceYear" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%"
        v-if="route.query.tables === 'RainfallStationCharacteristicValues'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="RainfallStationCharacteristicValuesForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="RainfallStationCharacteristicValuesForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="器口高度" prop="instrumentHeight">
                <el-input v-model="RainfallStationCharacteristicValuesForm.instrumentHeight" />
            </el-form-item>
            <el-form-item label="多年平均降雨量" prop="averageRainfall">
                <el-input v-model="RainfallStationCharacteristicValuesForm.averageRainfall" />
            </el-form-item>
            <el-form-item label="实测年最大降雨量" prop="measuredMaxRainfall">
                <el-input v-model="RainfallStationCharacteristicValuesForm.measuredMaxRainfall" />
            </el-form-item>
            <el-form-item label="出现年份" prop="occurrenceYear">
                <el-input v-model="RainfallStationCharacteristicValuesForm.occurrenceYear" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateDialogVisible" title="更新" width="30%"
        v-if="route.query.tables === 'EvaporationStationCharacteristicValues'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="EvaporationStationCharacteristicValuesForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="EvaporationStationCharacteristicValuesForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="多年平均蒸发量" prop="averageEvaporation">
                <el-input v-model="EvaporationStationCharacteristicValuesForm.averageEvaporation" />
            </el-form-item>
            <el-form-item label="蒸发器型号" prop="evaporationInstrumentModel">
                <el-input v-model="EvaporationStationCharacteristicValuesForm.evaporationInstrumentModel" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="update">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="insertDialogVisible" title="插入" width="30%"
        v-if="route.query.tables === 'EvaporationStationCharacteristicValues'" :before-close="leave">
        <el-form>
            <el-form-item label="测站编码" prop="stationCode">
                <el-input v-model="EvaporationStationCharacteristicValuesForm.stationCode" />
            </el-form-item>
            <el-form-item label="测站类型" prop="stationType">
                <el-select v-model="EvaporationStationCharacteristicValuesForm.stationType" placeholder="选择类型">
                    <el-option label="水文站" value="水文站" />
                    <el-option label="水位站" value="水位站" />
                    <el-option label="雨量站" value="雨量站" />
                    <el-option label="蒸发站" value="蒸发站" />
                </el-select>
            </el-form-item>
            <el-form-item label="多年平均蒸发量" prop="averageEvaporation">
                <el-input v-model="EvaporationStationCharacteristicValuesForm.averageEvaporation" />
            </el-form-item>
            <el-form-item label="蒸发器型号" prop="evaporationInstrumentModel">
                <el-input v-model="EvaporationStationCharacteristicValuesForm.evaporationInstrumentModel" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="leave">取消</el-button>
                <el-button type="primary" @click="insert">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute();
let updateDialogVisible = ref(false);
let insertDialogVisible = ref(false);

let tableData = inject('tableData');
let selection = inject('selection');


let updateDialog = () => {
    if (selection.value.length === 0) {
        ElMessage({
            message: '请选择一行数据',
            type: 'error',
        })
        return;
    } else if (selection.value.length > 1) {
        ElMessage({
            message: '一次只能修改一行数据',
            type: 'error',
        })
        return;
    }
    switch (route.query.tables) {
        case 'StationOverview': Object.keys(StationOverviewForm.value).forEach(key => {
            StationOverviewForm.value[key] = selection.value[0][key];
        }); break;
        case 'ElevationInfo': Object.keys(ElevationInfoForm.value).forEach(key => {
            ElevationInfoForm.value[key] = selection.value[0][key];
        }); break;
        case 'StationGeographicalLocation': Object.keys(StationGeographicalLocationForm.value).forEach(key => {
            StationGeographicalLocationForm.value[key] = selection.value[0][key];
        }); break;
        case 'StationAddress': Object.keys(StationAddressForm.value).forEach(key => {
            StationAddressForm.value[key] = selection.value[0][key];
        }); break;
        case 'StationBasicInfo': Object.keys(StationBasicInfoForm.value).forEach(key => {
            StationBasicInfoForm.value[key] = selection.value[0][key];
        }); break;
        case 'HydrologicalStationCharacteristicValues': Object.keys(HydrologicalStationCharacteristicValuesForm.value).forEach(key => {
            HydrologicalStationCharacteristicValuesForm.value[key] = selection.value[0][key];
        }); break;
        case 'WaterLevelStationCharacteristicValues': Object.keys(WaterLevelStationCharacteristicValuesForm.value).forEach(key => {
            WaterLevelStationCharacteristicValuesForm.value[key] = selection.value[0][key];
        }); break;
        case 'RainfallStationCharacteristicValues': Object.keys(RainfallStationCharacteristicValuesForm.value).forEach(key => {
            RainfallStationCharacteristicValuesForm.value[key] = selection.value[0][key];
        }); break;
        case 'EvaporationStationCharacteristicValues': Object.keys(EvaporationStationCharacteristicValuesForm.value).forEach(key => {
            EvaporationStationCharacteristicValuesForm.value[key] = selection.value[0][key];
        }); break;
        default: ;
    }
    updateDialogVisible.value = true;
}

let update = () => {
    ElMessageBox.confirm('确定本次输入吗？',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            ElMessage({
                message: '提交请求成功',
                type: 'success',
            });
            updateDialogVisible.value = false;
            switch (route.query.tables) {
                case 'StationOverview': Object.keys(StationOverviewForm.value).forEach(key => {
                    selection.value[0][key] = StationOverviewForm.value[key];
                }); break;
                case 'ElevationInfo': Object.keys(ElevationInfoForm.value).forEach(key => {
                    selection.value[0][key] = ElevationInfoForm.value[key];
                }); break;
                case 'StationGeographicalLocation': Object.keys(StationGeographicalLocationForm.value).forEach(key => {
                    selection.value[0][key] = StationGeographicalLocationForm.value[key];
                }); break;
                case 'StationAddress': Object.keys(StationAddressForm.value).forEach(key => {
                    selection.value[0][key] = StationAddressForm.value[key];
                }); break;
                case 'StationBasicInfo': Object.keys(StationBasicInfoForm.value).forEach(key => {
                    selection.value[0][key] = StationBasicInfoForm.value[key];
                }); break;
                case 'HydrologicalStationCharacteristicValues': Object.keys(HydrologicalStationCharacteristicValuesForm.value).forEach(key => {
                    selection.value[0][key] = HydrologicalStationCharacteristicValuesForm.value[key];
                }); break;
                case 'WaterLevelStationCharacteristicValues': Object.keys(WaterLevelStationCharacteristicValuesForm.value).forEach(key => {
                    selection.value[0][key] = WaterLevelStationCharacteristicValuesForm.value[key];
                }); break;
                case 'RainfallStationCharacteristicValues': Object.keys(RainfallStationCharacteristicValuesForm.value).forEach(key => {
                    selection.value[0][key] = RainfallStationCharacteristicValuesForm.value[key];
                }); break;
                case 'EvaporationStationCharacteristicValues': Object.keys(EvaporationStationCharacteristicValuesForm.value).forEach(key => {
                    selection.value[0][key] = EvaporationStationCharacteristicValuesForm.value[key];
                }); break;
                default: ;
            }
            Object.keys(tableData.value[selection.value[0][index]]).forEach(key => {
                tableData.value[selection.value[0][index]][key] = selection.value[0];
            })
        })
}

let insertDialog = () => {
    insertDialogVisible.value = true;
}

let insert = () => {
    ElMessage({
        message: '提交请求成功',
        type: 'success',
    });
    switch (route.query.tables) {
        case 'StationOverview': tableData.value.unshift(StationOverviewForm.value); break;
        case 'ElevationInfo': tableData.value.unshift(ElevationInfoForm.value); break;
        case 'StationGeographicalLocation': tableData.value.unshift(StationGeographicalLocationForm.value); break;
        case 'StationAddress': tableData.value.unshift(StationAddressForm.value); break;
        case 'StationBasicInfo': tableData.value.unshift(StationBasicInfoForm.value); break;
        case 'HydrologicalStationCharacteristicValues': tableData.value.unshift(HydrologicalStationCharacteristicValuesForm.value); break;
        case 'WaterLevelStationCharacteristicValues': tableData.value.unshift(WaterLevelStationCharacteristicValuesForm.value); break;
        case 'RainfallStationCharacteristicValues': tableData.value.unshift(RainfallStationCharacteristicValuesForm.value); break;
        case 'EvaporationStationCharacteristicValues': tableData.value.unshift(EvaporationStationCharacteristicValuesForm.value); break;
        default: ;
    }
    insertDialogVisible.value = false;
}

let leave = () => {
    ElMessageBox.confirm('退出本次输入吗？',
        'Warning',
        {
            confirmButtonText: '退出',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            insertDialogVisible.value = false;
            updateDialogVisible.value = false;
            switch (route.query.tables) {
                case 'StationOverview': Object.keys(StationOverviewForm.value).forEach(key => {
                    StationOverviewForm.value[key] = null;
                }); break;
                case 'ElevationInfo': Object.keys(ElevationInfoForm.value).forEach(key => {
                    ElevationInfoForm.value[key] = null;
                }); break;
                case 'StationGeographicalLocation': Object.keys(StationGeographicalLocationForm.value).forEach(key => {
                    StationGeographicalLocationForm.value[key] = null;
                }); break;
                case 'StationAddress': Object.keys(StationAddressForm.value).forEach(key => {
                    StationAddressForm.value[key] = null;
                }); break;
                case 'StationBasicInfo': Object.keys(StationBasicInfoForm.value).forEach(key => {
                    StationBasicInfoForm.value[key] = null;
                }); break;
                case 'HydrologicalStationCharacteristicValues': Object.keys(HydrologicalStationCharacteristicValuesForm.value).forEach(key => {
                    HydrologicalStationCharacteristicValuesForm.value[key] = null;
                }); break;
                case 'WaterLevelStationCharacteristicValues': Object.keys(WaterLevelStationCharacteristicValuesForm.value).forEach(key => {
                    WaterLevelStationCharacteristicValuesForm.value[key] = null;
                }); break;
                case 'RainfallStationCharacteristicValues': Object.keys(RainfallStationCharacteristicValuesForm.value).forEach(key => {
                    RainfallStationCharacteristicValuesForm.value[key] = null;
                }); break;
                case 'EvaporationStationCharacteristicValues': Object.keys(EvaporationStationCharacteristicValuesForm.value).forEach(key => {
                    EvaporationStationCharacteristicValuesForm.value[key] = null;
                }); break;
                default: ;
            }
        })
}

let StationOverviewForm = ref({
    stationCode: '',
    stationType: '',
    stationName: ''
});

// ElevationInfo table
let ElevationInfoForm = ref({
    elevationInfoCode: '',
    stationType: '',
    stationElevation: '',
    referenceFrameName: '',
    referenceFrameCorrection: ''
});

// StationGeographicalLocation table
let StationGeographicalLocationForm = ref({
    stationCode: '',
    stationType: '',
    longitude: '',
    latitude: ''
});

// StationAddress table
let StationAddressForm = ref({
    stationAddressCode: '',
    stationType: '',
    provinceAutonomousRegionMunicipality: '',
    cityDistrict: '',
    countyCity: '',
    townVillage: '',
    villageStreet: ''
});

// StationBasicInfo table
let StationBasicInfoForm = ref({
    stationCode: '',
    stationType: '',
    basinWaterSystem: '',
    riverName: '',
    installationDate: '',
    drainageArea: '',
    stationClassManagement: '',
    stationAttribute: '',
    stationClassification: '',
    stationAddressCode: '',
    constructionManagementUnit: ''
});

// HydrologicalStationCharacteristicValues table
let HydrologicalStationCharacteristicValuesForm = ref({
    stationCode: '',
    stationType: '',
    averageRunoff: '',
    measuredMaxFlow: '',
    measuredMaxFlowTime: '',
    measuredMinFlow: '',
    measuredMinFlowTime: ''
});

// WaterLevelStationCharacteristicValues table
let WaterLevelStationCharacteristicValuesForm = ref({
    stationCode: '',
    stationType: '',
    measuredMaxWaterLevel: '',
    measuredMaxWaterLevelTime: '',
    measuredMinWaterLevel: '',
    measuredMinWaterLevelTime: ''
});

// RainfallStationCharacteristicValues table
let RainfallStationCharacteristicValuesForm = ref({
    stationCode: '',
    stationType: '',
    instrumentHeight: '',
    averageRainfall: '',
    measuredMaxRainfall: '',
    occurrenceYear: ''
});

// EvaporationStationCharacteristicValues table
let EvaporationStationCharacteristicValuesForm = ref({
    stationCode: '',
    stationType: '',
    averageEvaporation: '',
    evaporationInstrumentModel: ''
});


</script>