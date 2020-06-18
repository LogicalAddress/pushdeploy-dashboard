import { dispatchAsync } from '../ReduxDispatcher';
import constants from '../Constants.js';
import DNS from '../api/DNS';
let DNSAction = {
  
  createDNSZone(payload) {
    return (dispatch) => {
      dispatchAsync(DNS.createDNSZone, dispatch, {
        request: constants.CREATE_DNS_ZONE,
        success: constants.CREATE_DNS_ZONE_SUCCESS,
        failure: constants.CREATE_DNS_ZONE_ERROR
      }, payload);
    }
  },
  
  fetchDNSZones(payload, blocking = true) {
    return (dispatch) => {
      dispatchAsync(DNS.fetchDNSZones, dispatch, {
        request: constants.FETCH_DNS_ZONES,
        success: constants.FETCH_DNS_ZONES_SUCCESS,
        failure: constants.FETCH_DNS_ZONES_ERROR
      }, payload, blocking);
    }
  },

  getDNSPassFlag(payload, blocking = true) {
    return (dispatch) => {
      dispatchAsync(DNS.getDNSPassFlag, dispatch, {
        request: constants.FETCH_DNS_PASS_FLAG,
        success: constants.FETCH_DNS_PASS_FLAG_SUCCESS,
        failure: constants.FETCH_DNS_PASS_FLAG_ERROR
      }, payload, blocking);
    }
  },

  fetchZone(payload, blocking = true) {
    return (dispatch) => {
      dispatchAsync(DNS.fetchZone, dispatch, {
        request: constants.FETCH_DNS_ZONE,
        success: constants.FETCH_DNS_ZONE_SUCCESS,
        failure: constants.FETCH_DNS_ZONE_ERROR
      }, payload, blocking);
    }
  },

  deleteDNSZone(payload) {
    return (dispatch) => {
      dispatchAsync(DNS.deleteDNSZone, dispatch, {
        request: constants.DELETE_DNS_ZONE,
        success: constants.DELETE_DNS_ZONE_SUCCESS,
        failure: constants.DELETE_DNS_ZONE_ERROR
      }, payload);
    }
  },

  createDNSRecord(payload) {
    return (dispatch) => {
      dispatchAsync(DNS.createDNSRecord, dispatch, {
        request: constants.CREATE_DNS_RECORD,
        success: constants.CREATE_DNS_RECORD_SUCCESS,
        failure: constants.CREATE_DNS_RECORD_ERROR
      }, payload);
    }
  },
  
  fetchDNSRecords(payload, blocking = true) {
    return (dispatch) => {
      dispatchAsync(DNS.fetchDNSRecords, dispatch, {
        request: constants.FETCH_DNS_RECORDS,
        success: constants.FETCH_DNS_RECORDS_SUCCESS,
        failure: constants.FETCH_DNS_RECORDS_ERROR
      }, payload, blocking);
    }
  },

  deleteDNSRecord(payload) {
    return (dispatch) => {
      dispatchAsync(DNS.deleteDNSRecord, dispatch, {
        request: constants.DELETE_DNS_RECORD,
        success: constants.DELETE_DNS_RECORD_SUCCESS,
        failure: constants.DELETE_DNS_RECORD_ERROR
      }, payload);
    }
  },

  createZoneAndARecord(payload) {
    return (dispatch) => {
      dispatchAsync(DNS.createZoneAndARecord, dispatch, {
        request: constants.CREATE_DNS_ZONE_RECORD,
        success: constants.CREATE_DNS_ZONE_RECORD_SUCCESS,
        failure: constants.CREATE_DNS_ZONE_RECORD_ERROR
      }, payload);
    }
  }

};

export default DNSAction;